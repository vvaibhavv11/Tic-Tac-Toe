// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use serde::Deserialize;
#[derive(Deserialize)]
#[allow(dead_code)]
struct CellData {
    r1c1: String,
    r1c2: String,
    r1c3: String,
    r2c1: String,
    r2c2: String,
    r2c3: String,
    r3c1: String,
    r3c2: String,
    r3c3: String,
}

#[tauri::command(rename_all = "snake_case")]
fn change_value(data: &str) -> String {
    match data {
        "O" => "X".to_string(),
        "X" => "O".to_string(),
        _ => "O".to_string(),
    }
}

#[tauri::command(rename_all = "snake_case")]
fn win_condition(celldata: CellData) -> bool {
    let win_conditions = [
        (&celldata.r1c1, &celldata.r1c2, &celldata.r1c3),
        (&celldata.r2c1, &celldata.r2c2, &celldata.r2c3),
        (&celldata.r3c1, &celldata.r3c2, &celldata.r3c3),
        (&celldata.r1c1, &celldata.r2c1, &celldata.r3c1),
        (&celldata.r1c2, &celldata.r2c2, &celldata.r3c2),
        (&celldata.r1c3, &celldata.r2c3, &celldata.r3c3),
        (&celldata.r1c1, &celldata.r2c2, &celldata.r3c3),
        (&celldata.r1c3, &celldata.r2c2, &celldata.r3c1),
    ];

    win_conditions.iter().any(|&(a, b, c)| a == b && b == c && !a.is_empty())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![change_value, win_condition])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
