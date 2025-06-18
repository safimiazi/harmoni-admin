import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CalculateCard from "../reuseabelComponents/calculateCard";
import RevenueDashboard from "./RevenueDashboard";
import ActiveUsersDashboard from "./ActiveUsersDashboard";
import Title from "../reuseabelComponents/Title";

const ReportAnalysisComponents = () => {
  return (
    <div className="w-full  mx-auto  ">
      <div className="flex justify-between items-center mb-10">
        <Title title="Reports & Analytics" />
        <Select>
          <SelectTrigger className="max-w-[180px] bg-white border-[#EBEBEB] text-base text-primary">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30 days">30 days</SelectItem>
            <SelectItem value="3 months">3 months</SelectItem>
            <SelectItem value="6 months">6 months</SelectItem>
            <SelectItem value="12 months">12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <h2 className="text-[var(--color-accent)] text-sm sm:text-lg tracking-[-0.4px] leading-[12px] sm:leading-[24px] font-semibold font-Robot pb-5">
        Key Metrics
      </h2>

      <CalculateCard />
      <RevenueDashboard />
      <ActiveUsersDashboard />
    </div>
  );
};

export default ReportAnalysisComponents;
