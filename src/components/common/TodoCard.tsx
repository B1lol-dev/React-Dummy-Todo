import { CheckCircle, Circle, Trash } from "lucide-react";

interface TodoCardProps {
  id: string | number;
  todo: string;
  completed: boolean;
  onToggle: (id: any, completed?: boolean) => void;
  onDelete?: (id: any) => void;
  onEdit?: (id: number, text: string) => void;
}

export default function TodoCard({
  id,
  todo,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoCardProps) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md border-l-4 ${
        completed
          ? "border-l-emerald-500 bg-emerald-50"
          : "border-l-indigo-600 bg-white"
      } flex items-center justify-between group transition-all duration-300 hover:shadow-lg`}
    >
      <p
        className={`flex-1 text-base ${
          completed ? "text-slate-500 line-through" : "text-slate-700 "
        } transition-all duration-300`}
      >
        {todo}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(id)}
          className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          {completed ? (
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          ) : (
            <Circle className="h-5 w-5 text-violet-500" />
          )}
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all"
          >
            <Trash className="h-4 w-4 text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
}
