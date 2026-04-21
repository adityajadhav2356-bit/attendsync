export default function FallbackPage() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-slate-200">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Under Construction</h2>
      <p className="text-slate-500 max-w-md">The specific module you clicked is currently being built and integrated with the Supabase backend. Please use the Dashboard for now.</p>
    </div>
  );
}
