use chrono::Utc;
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;
use tokio::net::{TcpListener, TcpStream};
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::sync::Mutex;

const PUERTO: u16 = 28000;
const NODOS_FIJOS: usize = 60;

#[derive(Debug, Clone)]
struct Nodo {
    id: usize,
    activo: bool,
    ultima_vez: u64
}

fn cartel_bienvenida() -> String {
    format!(
        "\n============================================\n\
        🛡️ SOCXIMA — DENTRO DE TÚNEL: https://znisvekfgq0x.share.zrok.io\n\
        ✅ ACTIVO | PUERTO {} | {} NODOS\n\
        📡 VÍA ABIERTA PRIMERO\n\
        ============================================\n",
        PUERTO, NODOS_FIJOS
    )
}

async fn señal_expansion() {
    let mut intervalo = tokio::time::interval(Duration::from_secs(10));
    loop {
        intervalo.tick().await;
        println!("{} [BEACON] 📡 SEÑAL POR TÚNEL | NODOS:{} ✅",
            Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ"), NODOS_FIJOS);
    }
}

async fn ciclo_central(_nodos: Arc<Mutex<HashMap<usize, Nodo>>>) {
    println!("{} [NEURAL] ⚡ CICLO COMPLETADO — {} NODOS ✅",
        Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ"), NODOS_FIJOS);
}

async fn manejar_conexion(mut flujo: TcpStream, _nodos: Arc<Mutex<HashMap<usize, Nodo>>>) {
    let dir = flujo.peer_addr().map(|a|a.to_string()).unwrap_or("desconocido".into());
    println!("\n>>> 📥 CONEXIÓN POR TÚNEL: {} <<<", dir);
    let _ = flujo.write_all(cartel_bienvenida().as_bytes()).await;
    let mut buf = [0u8;128];
    loop {
        match flujo.read(&mut buf).await {
            Ok(0)|Err(_)=>{println!("<<< 📤 CERRADA: {} >>>",dir);break;}
            Ok(_)=>{let _=flujo.write_all(b"<< SOCXIMA: OK >>\n").await;}
        }
    }
}

#[tokio::main]
async fn main()->Result<(),Box<dyn std::error::Error>>{
    println!("[SISTEMA] 🚀 INICIADO DENTRO DEL CAMINO YA ABIERTO");
    let lista=Arc::new(Mutex::new((1..=NODOS_FIJOS).map(|id|{
        (id,Nodo{id,activo:true,ultima_vez:Utc::now().timestamp_millis() as u64})
    }).collect()));
    tokio::spawn(señal_expansion());
    let escucha=TcpListener::bind(("127.0.0.1",PUERTO)).await?;
    println!("[SISTEMA] ✅ PUERTO {} LISTO — TRÁFICO AL TÚNEL",PUERTO);
    let mut ciclo=tokio::time::interval(Duration::from_secs(4));
    loop{tokio::select!{
        _=ciclo.tick()=>ciclo_central(Arc::clone(&lista)).await,
        res=escucha.accept()=>match res{
            Ok((c,_))=>{let _=tokio::spawn(manejar_conexion(c,Arc::clone(&lista)));}
            Err(e)=>eprintln!("[ERROR] ❌ {}",e),
        }
    }}
}
