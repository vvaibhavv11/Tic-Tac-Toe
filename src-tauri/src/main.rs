// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use std::vec;

#[tauri::command(rename_all = "snake_case")]
fn change_value(data: &str) -> String {
    match data {
        "O" => "X".to_string(),
        "X" => "O".to_string(),
        _ => "O".to_string(),
    }
}

#[tauri::command(rename_all = "snake_case")]
fn win_condition(game: Vec<Vec<String>>) -> bool {
    for i in 0..3 {
        if game[i][0] == game[i][1] && game[i][1] == game[i][2] && !game[i][0].is_empty() {
            return true;
        }
        if game[0][i] == game[1][i] && game[1][i] == game[2][i] && !game[0][i].is_empty() {
            return true;
        }
    }

    if game[0][0] == game[1][1] && game[1][1] == game[2][2] && !game[0][0].is_empty() {
        return true;
    }
    if game[0][2] == game[1][1] && game[1][1] == game[2][0] && !game[0][2].is_empty() {
        return true;
    }

    false
}

fn draw(data: &Vec<Vec<String>>) -> bool {
    for i in 0..3 {
        for j in 0..3 {
            if data[i][j] == "" {
                return false;
            }
        }
    }
    return true;
}

#[tauri::command(rename_all = "snake_case")]
fn minimax(mut data: Vec<Vec<String>>, depth: i64, is_max: bool) -> i64 {
    if !is_max && win_condition(data.clone()) {
        return 1;
    }

    if is_max && win_condition(data.clone()) {
        return -1;
    }

    if draw(&data) {
        return 0;
    }

    if is_max {
        let mut bestmove = -50;
        for i in 0..3 {
            for j in 0..3 {
                if data[i][j] == "" {
                    data[i][j] = "X".to_string();
                    bestmove = bestmove.max(minimax(data.clone(), depth + 1, false));
                    data[i][j] = "".to_string();
                }
            }
        }
        return bestmove;
    } else {
        let mut bestmove = 50;
        for i in 0..3 {
            for j in 0..3 {
                if data[i][j] == "" {
                    data[i][j] = "O".to_string();
                    bestmove = bestmove.min(minimax(data.clone(), depth + 1, true));
                    data[i][j] = "".to_string();
                }
            }
        }
        return bestmove;
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![change_value, win_condition, minimax])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
