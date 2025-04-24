import Header from "@/components/templates/tour-service/header/Header";
import Courses from "@/components/templates/tour-service/tours/Courses";

export default function TourService() {
  return (
    <div style={{padding:"3rem"}}>
      <main>
        <Header/>
       <Courses/>
      </main>
    </div>
  );
}
