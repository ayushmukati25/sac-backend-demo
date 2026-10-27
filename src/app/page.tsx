import WelcomeBar from "@/components/dashboard/WelcomeBar";
import PracticeCard from "@/components/dashboard/PracticeCard";
import PaymentsCard from "@/components/dashboard/PaymentsCard";
import ReferralCard from "@/components/dashboard/ReferralCard";
import VideoLibraryCard from "@/components/dashboard/VideoLibraryCard";

// Desktop: fits the viewport below the 4rem header, split 70% left and 30% right.
// Left: practice details, then payment history. Right: referrals (35%) over the video library (65%).
// On mobile the column wrappers dissolve (`contents`) and the order-* classes set the stacking order.
export default function DashboardPage() {
  return (
    <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-4 p-4 sm:p-6 lg:h-[calc(100dvh-4rem)] lg:grid-cols-10 lg:grid-rows-[auto_minmax(0,1fr)] lg:[@media(max-height:800px)]:gap-3 lg:[@media(max-height:800px)]:p-4">
      <div className="lg:col-span-10">
        <WelcomeBar />
      </div>

      <div className="flex min-h-0 flex-col gap-4 max-lg:contents lg:col-span-7 lg:[@media(max-height:800px)]:gap-3">
        <PracticeCard className="max-lg:order-1" />
        <PaymentsCard className="max-lg:order-2 lg:flex-1" />
      </div>

      <div className="flex min-h-0 flex-col gap-4 max-lg:contents lg:col-span-3 lg:[@media(max-height:800px)]:gap-3">
        <ReferralCard className="max-lg:order-3 lg:min-h-fit lg:flex-[35_1_0%]" />
        <VideoLibraryCard className="max-lg:order-4 lg:flex-[65_1_0%]" />
      </div>
    </div>
  );
}
