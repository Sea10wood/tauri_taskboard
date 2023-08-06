// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_board,
            handle_add_card,
            handle_move_card,
            handle_remove_card
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
use serde::{Deserialize, Serialize};

/// ボード
#[derive(Debug, Serialize, Deserialize)]
pub struct Board {
    columns: Vec<Column>,
}

/// カラム
#[derive(Debug, Serialize, Deserialize)]
pub struct Column {
    id: i64,
    title: String,
    cards: Vec<Card>,
}

/// カード
#[derive(Debug, Serialize, Deserialize)]
pub struct Card {
    id: i64,
    title: String,
    description: Option<String>,
    due_date: Option<String>,
}

/// カードの位置
#[derive(Debug, Serialize, Deserialize)]
pub struct CardPos {
    #[serde(rename = "columnId")]
    column_id: i64,
    position: i64,
}

// ボードのデータを作成して返すハンドラ
#[tauri::command]
fn get_board() -> Result<Board, String> {
    let mut col0 = Column::new(0, "やりたいタスク");
    col0.add_card(Card::new(0, "かんばんボードを追加する", Some("react-kanbanを使用する")));
    let col1 = Column::new(1, "タスク");
    let board = Board { columns: vec![col0, col1] };
    Ok(board)
}

/// カードの追加直後に呼ばれるハンドラ
#[tauri::command]
async fn handle_add_card(card: Card, pos: CardPos) -> Result<(), String> {
    // IPCで受信したデータをデバッグ表示する
    println!("handle_add_card ----------");
    dbg!(&card);
    dbg!(&pos);
    Ok(())
}

#[tauri::command]
async fn handle_add_card(card: Card, pos: CardPos, due_date: Option<String>) -> Result<(), String> {
    // カードに終了予定時間を追加
    let card_with_due_date = Card {
        due_date,
        ..card
    };
}
use std::fs::{File, OpenOptions};
use std::io::{Read, Write};

// ボードのデータを保存するファイル名
const BOARD_FILE: &str = "board.json";

// ...

/// ボードのデータを作成して返すハンドラ
#[tauri::command]
fn get_board() -> Result<Board, String> {
    // JSONファイルからボードデータを読み込む
    let board = match read_board_from_file() {
        Ok(board) => board,
        Err(_) => {
            // ファイルが存在しない場合やエラーの場合、デフォルトのボードを作成
            let mut col0 = Column::new(0, "やりたいタスク");
            col0.add_card(Card::new(0, "かんばんボードを追加する", Some("react-kanbanを使用する")));
            let col1 = Column::new(1, "タスク");
            let board = Board { columns: vec![col0, col1] };
            board
        }
    };
    Ok(board)
}

// ボードデータをJSONファイルから読み込む関数
fn read_board_from_file() -> Result<Board, Box<dyn std::error::Error>> {
    let mut file = File::open(BOARD_FILE)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    let board: Board = serde_json::from_str(&contents)?;
    Ok(board)
}

// ボードデータをJSONファイルに書き込む関数
fn write_board_to_file(board: &Board) -> Result<(), Box<dyn std::error::Error>> {
    let mut file = OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open(BOARD_FILE)?;

    let json = serde_json::to_string(board)?;
    file.write_all(json.as_bytes())?;
    Ok(())
}

/// カードの追加直後に呼ばれるハンドラ
#[tauri::command]
async fn handle_add_card(card: Card, pos: CardPos, due_date: Option<String>) -> Result<(), String> {
    // カードに終了予定時間を追加
    let card_with_due_date = Card {
        due_date,
        ..card
    };

    // ボードデータを読み込み
    let mut board = match read_board_from_file() {
        Ok(board) => board,
        Err(_) => Board { columns: vec![] },
    };

    // カードを追加
    if let Some(column) = board.columns.get_mut(pos.column_id as usize) {
        column.cards.insert(pos.position as usize, card_with_due_date);
    }

    // ボードデータをJSONファイルに保存
    if let Err(err) = write_board_to_file(&board) {
        return Err(err.to_string());
    }

    Ok(())
}

