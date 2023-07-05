export const MainPage = () => {
    const imageUrl = 'https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80';

  return (
    <div className="flex flex-col h-screen">
      <img src={imageUrl} alt="Chicken Wings" className="flex-grow bg-cover bg-center" />
    </div>
  );
}