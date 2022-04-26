export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface TaskItem extends Task {
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
}

export interface Action {
    type: string;
    payload?: any;
}
