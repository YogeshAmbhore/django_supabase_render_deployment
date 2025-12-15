import { Button, Card } from "antd";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">
          Vite + AntD + Tailwind
        </h1>

        <div className="flex justify-center">
          <Button type="primary">Ant Design Button</Button>
        </div>
      </Card>
    </div>
  );
}

export default App;
