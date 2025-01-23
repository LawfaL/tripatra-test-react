import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ContainerUser } from "./components/app/container-user";
import { ContainerProduct } from "./components/app/container-product";
import { ModalLogin } from "./components/app/modal-login";
import { useAuth } from "./hooks/auth";
import "./App.css";

function App() {
  const { getProfile } = useAuth();
  return (
    <main>
      <Tabs defaultValue="product" className="w-3/4 m-auto">
        <div className="w-full flex justify-between">
          <TabsList>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="user">Users</TabsTrigger>
          </TabsList>
          {!getProfile() && <ModalLogin />}
        </div>
        <TabsContent value="product">
          <ContainerProduct />
        </TabsContent>
        <TabsContent value="user">
          <ContainerUser />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default App;
