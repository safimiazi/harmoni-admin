

'use client'

import {
    useCreatePricingMutation,
    useDeletePricingMutation,
    useGetAllPricingPlanQuery,
    useUpdatePricingMutation,
} from '@/redux/features/user/userApi'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface PricingPlan {
    _id?: string
    name: string
    usedCase: string
    price: string | number
    token: string | number
    type: 'one_time' | 'recurring'
    interval?: 'month' | 'year'
}

const initialFormState: PricingPlan = {
    name: '',
    usedCase: '',
    price: '',
    token: '',
    type: 'one_time',
    interval: 'month',
}

const PricingPlanPage = () => {
    const [plans, setPlans] = useState<PricingPlan[]>([])
    const [formData, setFormData] = useState<PricingPlan>(initialFormState)
    const [isEditing, setIsEditing] = useState(false)

    const [createPricing] = useCreatePricingMutation()
    const [updatePricing] = useUpdatePricingMutation()
    const [deletePricing] = useDeletePricingMutation()
    const { data } = useGetAllPricingPlanQuery({})

    useEffect(() => {
        setPlans(data?.data?.result)
    }, [data])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'token' ? Number(value) : value,
        }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            let response

            if (isEditing && formData._id) {
                response = await updatePricing({ id: formData._id, body: formData }).unwrap()
            } else {
                response = await createPricing(formData).unwrap()
            }

            toast.success(response?.message || 'Operation successful!')

            setFormData(initialFormState)
            setIsEditing(false)
        } catch (error: any) {
            toast.error(error?.data?.message || 'Something went wrong!')
            console.error('Pricing operation failed', error)
        }
    }



    const handleEdit = (plan: PricingPlan) => {
        setFormData(plan)
        setIsEditing(true)
    }

    const handleDelete = async (id?: string) => {
        if (!id) return
        await deletePricing(id)
    }

    return (
        <div className="">
            <h1 className="text-3xl font-bold text-left text-gray-800">
                Manage Pricing Plans
            </h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg mb-5 mt-5  mx-auto space-y-6"
            >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    {isEditing ? 'Update Plan' : 'Create New Plan'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Plan Name"
                        className="border rounded-md px-4 py-2 w-full"
                        required
                    />
                    <input
                        type="text"
                        name="usedCase"
                        value={formData.usedCase}
                        onChange={handleChange}
                        placeholder="Use Case"
                        className="border rounded-md px-4 py-2 w-full"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price ($)"
                        className="border rounded-md px-4 py-2 w-full"
                        required
                    />
                    <input
                        type="number"
                        name="token"
                        value={formData.token}
                        onChange={handleChange}
                        placeholder="Token Amount"
                        className="border rounded-md px-4 py-2 w-full"
                        required
                    />
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="border rounded-md px-4 py-2 w-full"
                    >
                        <option value="one_time">One-Time</option>
                        <option value="recurring">Recurring</option>
                    </select>

                    {formData.type === 'recurring' && (
                        <select
                            name="interval"
                            value={formData.interval}
                            onChange={handleChange}
                            className="border rounded-md px-4 py-2 w-full"
                        >
                            <option value="month">Monthly</option>
                            <option value="year">Yearly</option>
                        </select>
                    )}
                </div>

                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
                    >
                        {isEditing ? 'Update Plan' : 'Create Plan'}
                    </button>
                </div>
            </form>

            {/* Table View */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="min-w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="px-4 py-3 border">Name</th>
                            <th className="px-4 py-3 border">Use Case</th>
                            <th className="px-4 py-3 border">Price ($)</th>
                            <th className="px-4 py-3 border">Tokens</th>
                            <th className="px-4 py-3 border">Type</th>
                            <th className="px-4 py-3 border">Interval</th>
                            <th className="px-4 py-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {plans?.map(plan => (
                            <tr key={plan._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{plan.name}</td>
                                <td className="px-4 py-2 border">{plan.usedCase}</td>
                                <td className="px-4 py-2 border">${plan.price}</td>
                                <td className="px-4 py-2 border">{plan.token}</td>
                                <td className="px-4 py-2 border capitalize">{plan.type.replace('_', ' ')}</td>
                                <td className="px-4 py-2 border">
                                    {plan.type === 'recurring' ? plan.interval : '—'}
                                </td>
                                <td className="px-4 py-2 border space-x-2">
                                    <button
                                        onClick={() => handleEdit(plan)}
                                        className="bg-yellow-400 hover:bg-yellow-500m cursor-pointer text-white text-xs px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(plan._id)}
                                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xs px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {plans?.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-6 text-gray-500">
                                    No pricing plans available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PricingPlanPage

