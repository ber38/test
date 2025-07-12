
export enum QuestionType {
  SINGLE_CHOICE,
  TABLE_CHOICE,
  TEXT_INPUT,
  TEXT_INPUT_PAIRS,
  TEXT_AREA,
}

export interface TableRow {
    label: string;
}

export interface TableData {
    headers: string[];
    rows: TableRow[];
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: string[];
  table?: TableData;
  numInputs?: number;
  correctAnswer: any;
  points: number;
}

export type AnswerState = {
  [key: string]: any;
};
