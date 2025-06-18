"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Plus, X, Edit2, Trash2, Check, ChevronDown } from "lucide-react";
import Title from "../reuseabelComponents/Title";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type Plan = {
  id: string;
  name: string;
  price: string;
  type: "monthly" | "yearly";
  features: string[];
  isPopular?: boolean;
};

export default function SubscriptionPlanControl() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Monthly Plan",
      price: "$9.99/month",
      type: "monthly",
      features: [
        "Access all videos",
        "Full course library",
        "Exclusive quotes",
        "Ad-free experience",
      ],
    },
    {
      id: "2",
      name: "Yearly Plan",
      price: "$99.99/year",
      type: "yearly",
      isPopular: true,
      features: [
        "Save 20% compared to monthly",
        "Access all videos",
        "Full course library",
        "Exclusive quotes",
        "Ad-free experience",
        "Priority customer support",
      ],
    },
  ]);

  const [newPlan, setNewPlan] = useState<Omit<Plan, "id">>({
    name: "",
    price: "",
    type: "monthly",
    features: [],
    isPopular: false,
  });
  const [newFeature, setNewFeature] = useState("");

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price) {
      setPlans([...plans, { ...newPlan, id: Date.now().toString() }]);
      resetForm();
      setIsDialogOpen(false);
    }
  };

  const handleUpdatePlan = () => {
    if (editingPlan) {
      setPlans(
        plans.map((plan) =>
          plan.id === editingPlan.id ? { ...newPlan, id: editingPlan.id } : plan
        )
      );
      resetForm();
      setIsDialogOpen(false);
    }
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: checked }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setNewPlan((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setNewPlan((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setNewPlan({
      name: "",
      price: "",
      type: "monthly",
      features: [],
      isPopular: false,
    });
    setEditingPlan(null);
    setNewFeature("");
  };

  const openEditDialog = (plan: Plan) => {
    setEditingPlan(plan);
    setNewPlan({
      name: plan.name,
      price: plan.price,
      type: plan.type,
      features: [...plan.features],
      isPopular: plan.isPopular || false,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Title title="Subscription Plan Management" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-[#003366] hover:bg-[#0a3b6d]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Plan
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px] bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#1D1B28]">
                {editingPlan ? "Edit Plan" : "Add New Plan"}
              </DialogTitle>
              <DialogDescription>
                {editingPlan
                  ? "Update the plan details"
                  : "Fill in the details for the new plan"}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Plan Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={newPlan.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g. Premium Monthly"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  value={newPlan.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="e.g. $9.99/month or $99.99/year"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">
                  Plan Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newPlan.type}
                  onChange={handleInputChange}
                  className="col-span-3 border rounded-md p-2"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="isPopular" className="text-right">
                  Popular Plan
                </label>
                <input
                  id="isPopular"
                  name="isPopular"
                  type="checkbox"
                  checked={newPlan.isPopular}
                  onChange={handleCheckboxChange}
                  className="col-span-3 h-4 w-4"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="features" className="text-right mt-2">
                  Features
                </label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add feature (e.g. 'Ad-free experience')"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addFeature}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border rounded-md p-2 space-y-2">
                    {newPlan.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span>{feature}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {newPlan.features.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        No features added yet
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  resetForm();
                }}
                className="text-[#003366] border-[#003366]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={editingPlan ? handleUpdatePlan : handleAddPlan}
                className="bg-[#003366] hover:bg-[#0a3b6d]/90"
              >
                {editingPlan ? "Update Plan" : "Add Plan"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans Table View */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">All Subscription Plans</h2>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        plan.type === "monthly" ? "default" : "secondary"
                      }
                    >
                      {plan.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{plan.price}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 px-2">
                          {plan.features.length} features{" "}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {plan.features.map((feature, index) => (
                          <DropdownMenuItem key={index} className="max-w-xs">
                            {feature}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    {plan.isPopular ? (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                      >
                        Popular
                      </Badge>
                    ) : (
                      <Badge variant="outline">Standard</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(plan)}
                        className="text-[#003366] hover:text-[#0a3b6d]"
                      >
                        <Edit2 className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Plans Preview Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Plans Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.isPopular ? "border-2 border-[#003366]" : ""
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#003366] text-white px-3 py-1 rounded-full">
                    Best Value
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="text-xl font-bold text-[#1D1B28]">
                    {plan.name}
                  </div>
                  <div className="text-3xl font-bold mt-2">{plan.price}</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.isPopular
                      ? "bg-[#003366] hover:bg-[#0a3b6d]"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {plan.isPopular ? "Get Started" : "Choose Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
