'use client'

import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
    useCreateLlmModelMutation,
    useDeleteLlmModelMutation,
    useGetAllLlmModelQuery,
    useUpdateLlmModelMutation,
    useGetAllLlmProviderQuery,
} from '@/redux/features/user/adminApi'

interface ILlmModelForm {
    _id?: string
    title: string
    name: string
    description: string
    price: number
    provider: string
    thumbnail?: File | null
}

const initialFormState: ILlmModelForm = {
    title: '',
    name: '',
    description: '',
    price: 0,
    provider: '',
    thumbnail: null,
}

const LlmModelPage = () => {
    const [formData, setFormData] = useState<ILlmModelForm>(initialFormState)
    const [editId, setEditId] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const limit = 10

    const [createLlmModel] = useCreateLlmModelMutation()
    const [updateLlmModel] = useUpdateLlmModelMutation()
    const [deleteLlmModel] = useDeleteLlmModelMutation()

    const { data: providers } = useGetAllLlmProviderQuery({ page: 0, limit: 100 })
    const { data, isLoading } = useGetAllLlmModelQuery({ page, limit, searchTerm: search, sort: '-createdAt', isDeleted: false })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFormData(prev => ({ ...prev, thumbnail: file || null }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = new FormData()
        form.append('data', JSON.stringify(formData))
        if (formData.thumbnail) {
            form.append('thumbnail', formData.thumbnail)
        }

        try {
            if (editId) {
                const res = await updateLlmModel({ id: editId, body: form }).unwrap()
                toast.success(res?.message || 'Model updated')
            } else {
                const res = await createLlmModel(form).unwrap()
                toast.success(res?.message || 'Model created')
            }
            setFormData(initialFormState)
            setEditId(null)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Operation failed')
        }
    }

    const handleEdit = (model: any) => {
        setFormData({
            _id: model._id,
            title: model.title,
            name: model.name,
            description: model.description,
            price: model.price,
            provider: model.provider._id || model.provider,
            thumbnail: null,
        })
        setEditId(model._id)
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteLlmModel(id).unwrap()
            toast.success(res?.message || 'Deleted')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Delete failed')
        }
    }

    const total = data?.data?.meta?.total || 0
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="min-h-screen bg-gray-50 w-full p-8">
            <div className="max-w-full mx-auto p-8">
                <h1 className="text-3xl font-extrabold text-start mb-12 text-gray-900 tracking-tight">Manage LLM Models</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 shadow-md rounded-xl p-8 mb-12 space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Model Title"
                            required
                            className="border border-gray-300 rounded-md px-5 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                        />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Model Name"
                            required
                            className="border border-gray-300 rounded-md px-5 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                        />
                        <input
                            type="number"
                            step="0.001"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price (USD)"
                            required
                            className="border border-gray-300 rounded-md px-5 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 placeholder-gray-400"
                        />
                        <select
                            name="provider"
                            value={formData.provider}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-5 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900"
                        >
                            <option value="">Select Provider</option>
                            {providers?.data?.result?.map((p: any) => (
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        rows={5}
                        className="w-full border border-gray-300 rounded-md px-5 py-3 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none text-gray-900 placeholder-gray-400 resize-none"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-4 py-3 file:bg-gray-100 file:rounded file:border-none file:mr-4 cursor-pointer"
                    />

                    <button
                        type="submit"
                        className="bg-blue-700 cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-all font-semibold shadow-md w-full sm:w-auto"
                    >
                        {editId ? 'Update Model' : 'Create Model'}
                    </button>
                </form>

                {/* Search */}
                <div className="mb-8 flex justify-end">
                    <input
                        type="text"
                        placeholder="Search models..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(0)
                        }}
                        className="border border-gray-300 px-5 py-3 rounded-md w-full md:w-1/3 focus:ring-2 focus:ring-blue-600 outline-none text-gray-900 placeholder-gray-400"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full text-left table-auto min-w-[700px]">
                        <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-sm tracking-wide">
                            <tr>
                                <th className="p-4 w-12">#</th>
                                <th className="p-4 w-36">Thumbnail</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Price (USD)</th>
                                <th className="p-4">Provider</th>
                                <th className="p-4 text-center w-36">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={7} className="p-8 text-center text-gray-500">Loading...</td></tr>
                            ) : data?.data?.result?.length ? (
                                data.data.result.map((model: any, idx: number) => (
                                    <tr key={model._id} className="border-t hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium">{page * limit + idx + 1}</td>
                                        <td className="p-4">
                                            <img
                                                src={model.thumbnail_url || 'https://via.placeholder.com/80?text=No+Image'}
                                                alt={model.title}
                                                className="w-20 h-14 object-cover rounded-md border border-gray-300 shadow-sm"
                                            />
                                        </td>
                                        <td className="p-4 font-semibold text-gray-900">{model.title}</td>
                                        <td className="p-4 text-gray-700">{model.name}</td>
                                        <td className="p-4 font-mono">${model.price.toFixed(3)}</td>
                                        <td className="p-4 text-gray-700">{model.provider?.name || model.provider}</td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(model)}
                                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg shadow-md transition"
                                                    aria-label={`Edit ${model.title}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(model._id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg shadow-md transition"
                                                    aria-label={`Delete ${model.title}`}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={7} className="p-8 text-center text-gray-400 italic">No models found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            className={`px-4 py-2 rounded-md font-semibold ${page === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}
                        >
                            Prev
                        </button>
                        <span className="px-4 py-2 font-semibold text-gray-700 select-none">
                            Page {page + 1} / {totalPages}
                        </span>
                        <button
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            className={`px-4 py-2 rounded-md font-semibold ${page + 1 >= totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LlmModelPage
