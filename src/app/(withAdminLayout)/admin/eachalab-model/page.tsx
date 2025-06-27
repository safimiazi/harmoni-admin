'use client'

import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
    useCreateEachalabModelMutation,
    useDeleteEachalabModelMutation,
    useUpdateEachalabModelMutation,
    useGetAllEachalabModelQuery,
} from '@/redux/features/user/adminApi'

interface IEachalabForm {
    id: string
    title: string
    name: string
    price: number
    intend: string
    thumbnail?: File | null
}

const initialFormState: IEachalabForm = {
    id: '',
    title: '',
    name: '',
    price: 0,
    intend: '',
    thumbnail: null,
}

const EachalabModelPage = () => {
    const [formData, setFormData] = useState<IEachalabForm>(initialFormState)
    const [editId, setEditId] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('-createdAt')
    const limit = 10

    const [createEachalabModel] = useCreateEachalabModelMutation()
    const [updateEachalabModel] = useUpdateEachalabModelMutation()
    const [deleteEachalabModel] = useDeleteEachalabModelMutation()

    const { data, isLoading } = useGetAllEachalabModelQuery({ page, limit, searchTerm: search, sort, isDeleted: false })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        setFormData(prev => ({ ...prev, thumbnail: file || null }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = new FormData()
        const { id, title, name, price, intend, thumbnail } = formData
        const modelData = { id, title, name, price, intend }

        form.append('data', JSON.stringify(modelData))
        if (thumbnail) form.append('thumbnail', thumbnail)

        try {
            if (editId) {
                const res = await updateEachalabModel({ id: editId, body: form }).unwrap()
                toast.success(res?.message || 'Model updated')
            } else {
                const res = await createEachalabModel(form).unwrap()
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
            id: model.id,
            title: model.title,
            name: model.name,
            price: model.price,
            intend: model.intend,
            thumbnail: null,
        })
        setEditId(model._id)
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteEachalabModel(id).unwrap()
            toast.success(res?.message || 'Deleted successfully')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Delete failed')
        }
    }

    const total = data?.data?.meta?.total || 0
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="min-h-screen p-8 w-full">
            <div className="bg-white rounded-xl p-8">
                <h1 className="text-3xl font-bold text-start mb-10 text-gray-800">Manage Eachalab Models</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input name="id" value={formData.id} onChange={handleChange} required
                            placeholder="ID"
                            className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input name="title" value={formData.title} onChange={handleChange} required
                            placeholder="Title"
                            className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input name="name" value={formData.name} onChange={handleChange} required
                            placeholder="Name"
                            className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input type="number" name="price" step="0.001" value={formData.price} onChange={handleChange} required
                            placeholder="Price"
                            className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input name="intend" value={formData.intend} onChange={handleChange} required
                            placeholder="Intend"
                            className="border border-gray-300 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <input type="file" accept="image/*" onChange={handleFileChange}
                        className="w-full text-sm border border-gray-300 rounded-md px-4 py-3 file:bg-gray-100 file:border-none file:rounded file:mr-3"
                    />

                    <button type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md"
                    >
                        {editId ? 'Update Model' : 'Create Model'}
                    </button>
                </form>

                {/* Search & Sort */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by title/name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setPage(0)
                        }}
                        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="-createdAt">Newest</option>
                        <option value="createdAt">Oldest</option>
                    
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-md shadow">
                    <table className="w-full table-auto min-w-[800px] text-left text-sm">
                        <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="p-4">#</th>
                                <th className="p-4">Thumbnail</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Intend</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={7} className="p-6 text-center text-gray-500">Loading...</td></tr>
                            ) : data?.data?.result?.length ? (
                                data.data.result.map((model: any, idx: number) => (
                                    <tr key={model._id} className="border-t hover:bg-gray-50">
                                        <td className="p-4">{page * limit + idx + 1}</td>
                                        <td className="p-4">
                                            <img
                                                src={model.thumbnail_url || 'https://via.placeholder.com/80?text=No+Image'}
                                                alt={model.title}
                                                className="w-20 h-14 object-cover rounded-md border"
                                            />
                                        </td>
                                        <td className="p-4">{model.title}</td>
                                        <td className="p-4">{model.name}</td>
                                        <td className="p-4">${model.price.toFixed(3)}</td>
                                        <td className="p-4">{model.intend}</td>
                                        <td className="p-4 text-center">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    onClick={() => handleEdit(model)}
                                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                                >Edit</button>
                                                <button
                                                    onClick={() => handleDelete(model._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={7} className="p-6 text-center text-gray-500">No models found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            className="px-4 py-2 rounded-md bg-white border hover:bg-gray-100 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-gray-600 font-medium">Page {page + 1} of {totalPages}</span>
                        <button
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 rounded-md bg-white border hover:bg-gray-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EachalabModelPage
