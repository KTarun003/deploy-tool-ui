// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs};
use std::fs::{File, ReadDir};
use std::io::Read;
use std::path::Path;
use rand::Rng;
use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Profile{
    #[serde(rename = "id")]
    id : String,
    #[serde(rename = "name")]
    name: String,
    #[serde(rename = "color")]
    color: String,
    #[serde(rename = "App")]
    pub app: App,
    #[serde(rename = "Server")]
    pub server: Server,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct App {
    #[serde(rename = "Name")]
    pub name: String,
    #[serde(rename = "Domain")]
    pub domain: String,
    #[serde(rename = "DllName")]
    pub dll_name: String,
    #[serde(rename = "PubPath")]
    pub pub_path: String,
    #[serde(rename = "DesPath")]
    pub des_path: String,
    #[serde(rename = "AppType")]
    pub app_type: String,
    #[serde(rename = "ServiceName")]
    pub service_name: String,
    #[serde(rename = "Scheme")]
    pub scheme: String,
    #[serde(rename = "Port")]
    pub port: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Server {
    #[serde(rename = "Host")]
    pub host: String,
    #[serde(rename = "User")]
    pub user: String,
    #[serde(rename = "Password")]
    pub password: String,
    #[serde(rename = "DotnetPath")]
    pub dotnet_path: String,
    #[serde(rename = "NginxPath")]
    pub nginx_path: String,
}

fn check_profiles_dir(){
    if !Path::new("C:\\DeployTool\\profiles").exists() {
        let res = fs::create_dir_all("C:\\DeployTool\\profiles");
        match res{
            Ok(_) => println!("Profiles Folder Created"),
            Err(err) => println!("Create Folder Error: {}",err)
        }
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_profiles() -> Vec<Profile> {
    check_profiles_dir();
    let entries = fs::read_dir("C:\\DeployTool\\profiles");
    match entries {
        Ok(val) => get_data_from_files(val),    // If result is Ok, return the value
        Err(err) => {
            println!("Read Directory Error: {}", err);
            Vec::new()
        }
    }
}

fn get_data_from_files(entries: ReadDir) -> Vec<Profile> {
    let mut data = Vec::new();

    for entry in entries {
        match entry {
            Err(err) => println!("Read File Error: {}", err),
            Ok(file) => {
                let mut file = File::open(file.path()).unwrap();
                let mut json = String::new();
                file.read_to_string(&mut json).unwrap();
                let res= serde_json::from_str(json.as_str());
                match res{
                    Err(err) => println!("Json: {} \nJson Parse Error: {}", json, err),
                    Ok(profile) => data.push(profile)
                }
            }
        }
    }
    return data;
}

#[tauri::command]
fn save_profile(data: String, profile_name: String) -> &'static str {
    check_profiles_dir();
    let filepath = format!("{}{}{}", "C:\\DeployTool\\profiles\\", profile_name, ".json");
    let res = fs::write(filepath, data);
    return match res{
        Err(err) => { println!("Write Error: {}", err); return "Error"; },
        Ok(()) => "Success"
    }
}

#[tauri::command]
fn get_random_color() -> String {
    let mut rng = rand::thread_rng(); // Initialize the random number generator

    // Generate random RGB values (0-255)
    let red: u8 = rng.gen();
    let green: u8 = rng.gen();
    let blue: u8 = rng.gen();

    // Convert RGB to hexadecimal
    format!("#{:02X}{:02X}{:02X}", red, green, blue)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_profiles,get_random_color,save_profile])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
