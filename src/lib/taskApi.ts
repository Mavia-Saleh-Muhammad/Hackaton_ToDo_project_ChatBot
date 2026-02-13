/**
 * Task API Service - CRUD operations for todo/task management.
 * All endpoints require JWT authentication.
 */

import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from './api';

/**
 * Task entity matching backend API schema
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at: string;
  user_id: string;
}

/**
 * Request payload for creating a new task
 */
export interface CreateTaskRequest {
  title: string;
  description?: string;
}

/**
 * Request payload for updating a task
 */
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: 'pending' | 'completed';
}

/**
 * API response wrapper for task list
 */
interface TaskListResponse {
  todos: Task[];
}

/**
 * Get all tasks for a user
 */
export async function getUserTasks(userId: string): Promise<Task[]> {
  // The backend filters by authenticated user via JWT
  // userId parameter kept for API compatibility
  const response = await apiGet<TaskListResponse>('/api/todos');
  return response.todos || [];
}

/**
 * Create a new task
 */
export async function createTask(
  userId: string,
  data: CreateTaskRequest
): Promise<Task> {
  // userId passed via JWT, not in request body
  return apiPost<Task>('/api/todos', {
    title: data.title,
    description: data.description,
    completed: false,
  });
}

/**
 * Update an existing task
 */
export async function updateTask(
  userId: string,
  taskId: string,
  data: UpdateTaskRequest
): Promise<Task> {
  const payload: Record<string, unknown> = {};

  if (data.title !== undefined) {
    payload.title = data.title;
  }
  if (data.description !== undefined) {
    payload.description = data.description;
  }
  if (data.status !== undefined) {
    payload.completed = data.status === 'completed';
  }

  return apiPut<Task>(`/api/todos/${taskId}`, payload);
}

/**
 * Delete a task
 */
export async function deleteTask(userId: string, taskId: string): Promise<void> {
  await apiDelete<void>(`/api/todos/${taskId}`);
}

/**
 * Toggle task completion status
 */
export async function toggleTaskCompletion(
  userId: string,
  taskId: string
): Promise<Task> {
  // First get the current task to toggle its status
  const tasks = await getUserTasks(userId);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    throw new Error('Task not found');
  }

  const newCompleted = task.status !== 'completed';

  return apiPatch<Task>(`/api/todos/${taskId}/complete`, {
    completed: newCompleted,
  });
}

/**
 * Mark a task as complete
 */
export async function markTaskComplete(
  userId: string,
  taskId: string
): Promise<Task> {
  return apiPatch<Task>(`/api/todos/${taskId}/complete`, {
    completed: true,
  });
}

/**
 * Mark a task as incomplete
 */
export async function markTaskIncomplete(
  userId: string,
  taskId: string
): Promise<Task> {
  return apiPatch<Task>(`/api/todos/${taskId}/complete`, {
    completed: false,
  });
}
