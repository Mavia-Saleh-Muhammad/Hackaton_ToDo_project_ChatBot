'use client';

/**
 * Dashboard page - protected route that displays user tasks.
 * Flagship UI with premium design, dark mode support, and micro-interactions.
 */
import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} from '../../lib/taskApi';
import type { Task } from '../../lib/taskApi';

function DashboardContent() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const userTasks = await getUserTasks(user.user_id);
      setTasks(userTasks);
      setError(null);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!user || !newTaskTitle.trim()) return;

    try {
      const newTask = await createTask(user.user_id, {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || undefined,
      });

      setTasks([newTask, ...tasks]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setShowCreateModal(false);
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask || !user) return;

    try {
      const updatedTask = await updateTask(user.user_id, editingTask.id, {
        title: editingTask.title,
        description: editingTask.description || undefined,
        status: editingTask.status,
      });

      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      setEditingTask(null);
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user || !confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(user.user_id, taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleToggleCompletion = async (task: Task) => {
    if (!user) return;

    try {
      const updatedTask = await toggleTaskCompletion(user.user_id, task.id);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
      setError('Failed to update task status. Please try again.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask({ ...task });
    setShowEditModal(true);
  };

  // Loading skeleton
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-bg-primary">
          {/* Header */}
          <header className="sticky top-0 z-50 glass border-b border-slate-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  Dashboard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Welcome, {user?.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button variant="ghost" size="md" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            </div>
          </header>

          {/* Loading skeleton */}
          <main className="max-w-4xl mx-auto px-6 py-8">
            <Card>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-6 bg-slate-50 dark:bg-slate-700/50"
                    >
                      <div className="shimmer h-6 w-3/4 rounded-lg mb-3" />
                      <div className="shimmer h-4 w-1/2 rounded-lg" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-bg-primary">
        {/* Header with glassmorphism */}
        <header className="sticky top-0 z-50 glass border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                Dashboard
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Welcome, {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowCreateModal(true)}
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Task
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="md" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-4xl mx-auto px-6 py-8">
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-xl animate-fadeInUp">
              <p className="text-rose-700 dark:text-rose-400">{error}</p>
            </div>
          )}

          <Card padding="none">
            <CardHeader>
              <CardTitle>Your Tasks ({tasks.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {tasks.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-6">
                    <svg
                      className="w-12 h-12 stroke-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    No tasks yet
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
                    Get started by creating your first task
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create your first task
                  </Button>
                </div>
              ) : (
                /* Task list */
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`
                        p-6 flex items-start gap-4
                        hover:bg-slate-50 dark:hover:bg-slate-700/30
                        transition-all duration-200 ease-out
                        animate-fadeInUp
                        ${task.status === 'completed' ? 'opacity-60' : ''}
                      `}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Checkbox */}
                      <button
                        onClick={() => handleToggleCompletion(task)}
                        className={`
                          flex-shrink-0 w-6 h-6 rounded-lg border-2
                          transition-all duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                          ${
                            task.status === 'completed'
                              ? 'bg-emerald-500 border-emerald-500'
                              : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                          }
                        `}
                        aria-label={
                          task.status === 'completed'
                            ? 'Mark as incomplete'
                            : 'Mark as complete'
                        }
                      >
                        {task.status === 'completed' && (
                          <svg
                            className="w-full h-full text-white p-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              className="checkmark-path completed"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`
                            font-semibold text-slate-900 dark:text-slate-50
                            ${task.status === 'completed' ? 'line-through text-slate-500 dark:text-slate-400' : ''}
                          `}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p
                            className={`
                              mt-1 text-sm text-slate-600 dark:text-slate-400
                              ${task.status === 'completed' ? 'line-through' : ''}
                            `}
                          >
                            {task.description}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                          Created {new Date(task.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        {/* Create Task Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setNewTaskTitle('');
            setNewTaskDescription('');
          }}
          title="Create New Task"
          size="md"
        >
          <div className="space-y-6">
            <Input
              label="Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
              autoFocus
            />
            <Input
              label="Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Add more details (optional)"
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setShowCreateModal(false);
                  setNewTaskTitle('');
                  setNewTaskDescription('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleCreateTask}
                disabled={!newTaskTitle.trim()}
              >
                Create Task
              </Button>
            </div>
          </div>
        </Modal>

        {/* Edit Task Modal */}
        {editingTask && (
          <Modal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setEditingTask(null);
            }}
            title="Edit Task"
            size="md"
          >
            <div className="space-y-6">
              <Input
                label="Title"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                placeholder="Task title"
                required
              />
              <Input
                label="Description"
                value={editingTask.description || ''}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    description: e.target.value || undefined,
                  })
                }
                placeholder="Add more details (optional)"
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Status
                </label>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={editingTask.status === 'pending'}
                      onChange={() =>
                        setEditingTask({ ...editingTask, status: 'pending' })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                      Pending
                    </span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={editingTask.status === 'completed'}
                      onChange={() =>
                        setEditingTask({ ...editingTask, status: 'completed' })
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                    <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                      Completed
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingTask(null);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="md" onClick={handleUpdateTask}>
                  Update Task
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
