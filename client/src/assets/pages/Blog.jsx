import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {
  const { id } = useParams()
  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  // ✅ Fetch single blog
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`)
      if (res.data.success) {
        setData(res.data.blog)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load blog.')
    }
  }

  // ✅ Fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.post(`/api/blog/comment`, { blogId: id })
      if (res.data.success) {
        setComments(res.data.comments)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load comments.')
    }
  }

  // ✅ Add comment
  const addComment = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`/api/blog/add-comment`, {
        blog: id,
        name,
        content,
      })
      if (res.data.success) {
        toast.success(res.data.message)
        setName('')
        setContent('')
        fetchComments() // Refresh after success
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add comment.')
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id]) // ✅ Added dependency in case route changes

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt="Gradient Background"
        className="absolute -top-50 -z-1 opacity-50"
      />

      <Navbar />

      {/* ✅ Blog Header */}
      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary py-4 font-medium font-serif">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>

        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 font-serif">
          {data.title}
        </h1>

        {data.subTitle && (
          <h2 className="my-5 max-w-lg mx-auto font-serif text-gray-500">
            {data.subTitle}
          </h2>
        )}

        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 
          bg-primary/5 font-medium text-primary font-serif">
          {data.author || 'Admin'}
        </p>
      </div>

      {/* ✅ Blog Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="rounded-3xl mb-5 w-full"
          />
        )}

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* ✅ Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4 font-serif">
            Comments ({comments.length})
          </p>
          <div className="flex flex-col gap-4">
            {comments.length > 0 ? (
              comments.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600 font-serif"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img src={assets.user_icon} alt="" className="w-6" />
                    <p className="font-medium font-serif">{item.name}</p>
                  </div>
                  <p className="text-sm max-w-md ml-8">{item.content}</p>
                  <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                    {Moment(item.createdAt).fromNow()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 font-serif">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>

        {/* ✅ Add Comment Form */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4 font-serif">Add Your Comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />

            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none h-32"
            ></textarea>

            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        {/* ✅ Share Section */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4 font-serif">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <img src={assets.facebook_icon} width={50} alt="Facebook" />
            <img src={assets.twitter_icon} width={50} alt="Twitter" />
            <img src={assets.googleplus_icon} width={50} alt="Google Plus" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  )
}

export default Blog
