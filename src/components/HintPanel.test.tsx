import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HintPanel } from './HintPanel';

describe('HintPanel', () => {
  it('初期状態でプレースホルダーテキストを表示すること', () => {
    render(<HintPanel diskCount={3} />);
    expect(screen.getByText('困ったときはヒントボタンを押してね！')).toBeInTheDocument();
  });

  it('「ヒントを表示」ボタンを表示すること', () => {
    render(<HintPanel diskCount={3} />);
    const button = screen.getByText('ヒントを表示');
    expect(button).toBeInTheDocument();
  });

  it('ボタンクリック後にヒントメッセージが表示されること', () => {
    render(<HintPanel diskCount={3} />);
    const button = screen.getByText('ヒントを表示');
    fireEvent.click(button);
    expect(screen.getByText(/ロッド/)).toBeInTheDocument();
  });

  it('使用回数がカウントアップされること', () => {
    render(<HintPanel diskCount={3} />);
    const button = screen.getByText('ヒントを表示');
    
    fireEvent.click(button);
    expect(screen.getByText('使用回数: 1')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByText('使用回数: 2')).toBeInTheDocument();
  });

  it('リセットボタンがヒント表示後に有効化されること', () => {
    render(<HintPanel diskCount={3} />);
    const hintButton = screen.getByText('ヒントを表示');
    const resetButton = screen.getByText('リセット');
    
    expect(resetButton).toBeDisabled();
    
    fireEvent.click(hintButton);
    expect(resetButton).not.toBeDisabled();
  });

  it('リセットボタンで hintLevel がリセットされること', () => {
    render(<HintPanel diskCount={3} />);
    const hintButton = screen.getByText('ヒントを表示');
    const resetButton = screen.getByText('リセット');
    
    fireEvent.click(hintButton);
    expect(screen.getByText(/ロッド/)).toBeInTheDocument();
    
    fireEvent.click(resetButton);
    expect(screen.getByText('困ったときはヒントボタンを押してね！')).toBeInTheDocument();
  });

  it('diskCount が変わるとリセットされること', () => {
    const { rerender } = render(<HintPanel diskCount={3} />);
    const button = screen.getByText('ヒントを表示');
    
    fireEvent.click(button);
    expect(screen.getByText(/ロッド/)).toBeInTheDocument();
    
    rerender(<HintPanel diskCount={4} />);
    expect(screen.getByText('困ったときはヒントボタンを押してね！')).toBeInTheDocument();
  });
});
