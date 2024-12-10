import SearchBar from "./SearchBar";

export default function Header({ onSearch, openModal }) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold">Kanban</div>
      <SearchBar onSearch={onSearch} />
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        New Task
      </button>
    </div>
  );
}
