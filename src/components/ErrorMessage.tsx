function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center my-4 text-red-600 font-bold uppercase text-sm">
      {children}
    </div>
  );
}

export default ErrorMessage;
