import  {Header}  from "../UI/Header";
import { ShowUpdates } from "./Updates";

export const AboutUs = () => {
    return(
        <div className="bg-gray-100 min-h-screen">
  <Header text1 = "My Kitchen" text2 = "Here you will be getting updates about my application."></Header>

  <main className="container mx-auto py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ShowUpdates()}    
    </div>
  </main>

  <footer className=" bg-green-500 py-4 absolute bottom-0  left-0 right-0">
    <p className="text-center text-gray-600">© 2023 My Blog. All rights reserved.</p>
  </footer>
</div>
    );
}