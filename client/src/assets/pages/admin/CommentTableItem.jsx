import React from 'react'
import { assets } from '../../assets';
import { useAppContext } from '../../../context/AppContext'
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {

  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext()

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteComment = async () => {
    try {
      const confirm = window.confirm('Are you sure to wants to delete this comment');
      if (!confirm) return;

      const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className='border-b border-gray-300'>

      <td className='px-6 py-3'>
        <div className='mb-2'>
          <p className='font-medium text-gray-600'>Blog:</p>
          <p className='text-gray-700'>{blog?.title || 'N/A'}</p>
        </div>

        <div className='mb-2'>
          <p className='font-medium text-gray-600'>Name:</p>
          <p className='text-gray-700'>{comment.name}</p>
        </div>

        <div>
          <p className='font-medium text-gray-600'>Comment:</p>
          <p className='text-gray-700'>{comment.content}</p>
        </div>
      </td>


      <td className='px-6 py-3 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>


      <td className='px-6 py-3'>
        <div className='flex items-center gap-3'>

          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              alt="Approve"
              className='w-5 h-5 hover:scale-110 transition-all cursor-pointer'
              onClick={approveComment}
            />
          ) : (
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}


          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className='w-5 h-5 hover:scale-110 transition-all cursor-pointer'
          />
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
