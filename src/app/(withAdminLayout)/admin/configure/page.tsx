"use client";
import { useState } from "react";
import { useGetConfigureQuery, usePutConfigureMutation } from "@/redux/features/user/adminApi";
import toast from "react-hot-toast";

const Configure = () => {
    const { data, isLoading, refetch } = useGetConfigureQuery({});
    const [putConfigure] = usePutConfigureMutation();

    const [form, setForm] = useState({
        dollerPerToken: "",
        dailyTokenLimit: "",
    });

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        const config = data?.data;
        setSelectedId(config?._id || null);
        setForm({
            dollerPerToken: config?.dollerPerToken?.toString() || "",
            dailyTokenLimit: config?.dailyTokenLimit?.toString() || "",
        });
    };

    const handleSubmit = async () => {
        if (!selectedId) return;

        const payload = {
            dollerPerToken: parseFloat(form.dollerPerToken),
            dailyTokenLimit: parseInt(form.dailyTokenLimit),
        };

        try {
            await putConfigure({ id: selectedId, body: payload }).unwrap();
            toast.success("Configuration updated successfully");
            refetch();
            setSelectedId(null);
            setForm({ dollerPerToken: "", dailyTokenLimit: "" });
        } catch (err) {
            toast.error("Failed to update config");
        }
    };

    if (isLoading) return <p className="p-6 text-gray-600">Loading configuration...</p>;

    const config = data?.data;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Configuration Settings</h1>

            <div className="mb-6 space-y-1">
                <p><strong>Dollar per Token:</strong> ${config?.dollerPerToken}</p>
                <p><strong>Daily Token Limit:</strong> {config?.dailyTokenLimit}</p>
            </div>

            {!selectedId && (
                <button
                    onClick={handleEdit}
                    className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Edit Settings
                </button>
            )}

            {selectedId && (
                <div className="mt-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Dollar Per Token</label>
                            <input
                                type="number"
                                name="dollerPerToken"
                                value={form.dollerPerToken}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Daily Token Limit</label>
                            <input
                                type="number"
                                name="dailyTokenLimit"
                                value={form.dailyTokenLimit}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2 mt-1"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => {
                                setSelectedId(null);
                                setForm({ dollerPerToken: "", dailyTokenLimit: "" });
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Configure;
