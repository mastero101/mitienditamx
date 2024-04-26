export interface ColumnDefinition {
  field: string;
  title: string;
  align: 'left' | 'right' | 'center';
  type?: 'currency' | 'options' | 'date' | 'status';
  maxWidth?: number;
  sortDisabled?: boolean;
  hideOnMobile?: boolean;
}
