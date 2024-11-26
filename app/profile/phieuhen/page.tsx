import BackButton from "@/components/BackButton";
import PhieuHenTable from "@/components/phieuhen/PhieuHenTable";

export default function PhieuHenPage() {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <PhieuHenTable title="Phiếu Hẹn" />
      {/* <PostsPagination /> */}
    </>
  );
}
