const CreateUpdatePostLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
        <div className="bg-white rounded-2xl border border-primary/15 px-6 py-12">
            <div className="w-full max-w-xl mx-auto">
                {children}
            </div>
        </div>
    </div>
  )
}

export default CreateUpdatePostLayout
