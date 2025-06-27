'use client'

import React, { useState } from 'react'
import {
    useCreateLlmProviderMutation,
    useDeleteLlmProviderMutation,
    useGetAllLlmProviderQuery,
    useUpdateLlmProviderMutation,
} from '@/redux/features/user/adminApi'
import { toast } from 'react-hot-toast'

interface ILlmProvider {
    _id?: string
    name: string
}

const LlmProviderPage = () => {
    const [providerName, setProviderName] = useState('')
    const [editId, setEditId] = useState<string | null>(null)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const limit = 10

    const [createLlmProvider] = useCreateLlmProviderMutation()
    const [deleteLlmProvider] = useDeleteLlmProviderMutation()
    const [updateLlmProvider] = useUpdateLlmProviderMutation()

    const { data, isLoading } = useGetAllLlmProviderQuery({
        page,
        limit,
        sort: '-createdAt',
        searchTerm: search,
        isDeleted: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editId) {
                const res = await updateLlmProvider({ id: editId, body: { name: providerName } }).unwrap()
                toast.success(res?.message || 'Updated successfully')
            } else {
                const res = await createLlmProvider({ name: providerName }).unwrap()
                toast.success(res?.message || 'Created successfully')
            }
            setProviderName('')
            setEditId(null)
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong')
        }
    }

    const handleEdit = (provider: ILlmProvider) => {
        setProviderName(provider.name)
        setEditId(provider._id || null)
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteLlmProvider(id).unwrap()
            toast.success(res?.message || 'Deleted successfully')
        } catch (error: any) {
            toast.error(error?.data?.message || 'Deletion failed')
        }
    }

    const total = data?.data?.meta?.total || 0
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="w-full bg-white  mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold text-center mb-6">Manage LLM Providers</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-xl shadow border space-y-4 w-full"
            >
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <input
                        type="text"
                        className="input w-full border px-4 py-2 rounded"
                        placeholder="Enter provider name"
                        value={providerName}
                        onChange={e => setProviderName(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {editId ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>

            {/* Search */}
            <div className="mt-6 flex justify-end">
                <input
                    type="text"
                    placeholder="Search provider..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(0)
                    }}
                    className="border px-4 py-2 rounded w-full md:w-1/3"
                />
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto w-full">
                <table className="w-full table-auto border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Provider Name</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="p-4 text-center text-gray-500">Loading...</td>
                            </tr>
                        ) : (
                            data?.data?.result?.map((provider: ILlmProvider, index: number) => (
                                <tr key={provider._id} className="border-t">
                                    <td className="p-3">{page * limit + index + 1}</td>
                                    <td className="p-3">{provider.name}</td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleEdit(provider)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(provider._id!)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => setPage(prev => Math.max(0, prev - 1))}
                        disabled={page === 0}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-2">Page {page + 1} of {totalPages}</span>
                    <button
                        onClick={() => setPage(prev => Math.min(totalPages - 1, prev + 1))}
                        disabled={page + 1 >= totalPages}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default LlmProviderPage;
