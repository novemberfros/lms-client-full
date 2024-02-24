import Footer from "../footer";
import Header from "../header";

const ClientLayout = ({children}) => {
  return ( 
    <div className="vh-100 d-flex flex-column">
      <Header />

      <main className="flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
   );
}
 
export default ClientLayout;