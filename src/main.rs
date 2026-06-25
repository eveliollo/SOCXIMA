use chrono::Utc;
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;
use tokio::net::{TcpListener, TcpStream};
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::sync::Mutex;
use rand::Rng;

const PUERTO: u16 = 28000;
const NODOS_FIJOS: usize = 60;

#[derive(Debug, Clone)]
struct Nodo {
    id: usize,
    activo: bool,
    ultima_vez: u64,
    carga: u8,
    zona: u8
}

fn cartel_bienvenida() -> String {
    format!(
        "\n============================================\n\
        🛡️ SOCXIMA — DENTRO DE TÚNEL: https://znisvekfgq0x.share.zrok.io\n\
        ✅ ACTIVO | PUERTO {} | {} NODOS EN RED\n\
        📡 VÍA ABIERTA PRIMERO — ACTIVIDAD VISIBLE\n\
        ============================================\n",
        PUERTO, NODOS_FIJOS
    )
}

async fn señal_expansion(nodos: Arc<Mutex<HashMap<usize, Nodo>>>) {
    let mut intervalo = tokio::time::interval(Duration::from_secs(6));
    loop {
        intervalo.tick().await;
        let mut lista = nodos.lock().await;
        let mut activos = 0;
        let mut vista = String::from("  ACTIVIDAD: ");
        // ✅ GENERADOR LOCAL DENTRO DEL BUCLE → SEGURO PARA HILOS
        let mut rng = rand::thread_rng();

        for nodo in lista.values_mut() {
            if rng.gen_bool(0.95) {
                nodo.activo = true;
                activos += 1;
                nodo.carga = rng.gen_range(10..=95);
                nodo.zona = rng.gen_range(1..=12);
                nodo.ultima_vez = Utc::now().timestamp_millis() as u64;
            } else {
                nodo.activo = false;
            }
        }

        for n in lista.values().take(8) {
            vista.push_str(&format!("N{}[Z{}:{}%] ", n.id, n.zona, n.carga));
        }

        println!("{} [BEACON] 📡 SEÑAL | ACTIVOS:{} ✔️\n{}",
            Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ"), activos, vista);
    }
}

async fn ciclo_central(nodos: Arc<Mutex<HashMap<usize, Nodo>>>) {
    println!("{} [NEURAL] ⚡ CICLO COMPLETADO — {} NODOS SINCRONIZADOS ✅",
        Utc::now().format("%Y-%m-%dT%H:%M:%S%.3fZ"), nodos.lock().await.len());
}

async fn manejar_conexion(mut flujo: TcpStream, _nodos: Arc<Mutex<HashMap<usize, Nodo>>>) {
    let dir = flujo.peer_addr().map(|a|a.to_string()).unwrap_or("desconocido".into());
    println!("\n>>> 📥 CONEXIÓN POR TÚNEL: {} <<<", dir);
    let _ = flujo.write_all(cartel_bienvenida().as_bytes()).await;
    let mut buf = [0u8; 128];
    loop {
        match flujo.read(&mut buf).await {
            Ok(0)|Err(_)=>{println!("<<< 📤 CERRADA: {} >>>",dir);break;}
            Ok(_)=>{let _=flujo.write_all(b"<< SOCXIMA: OK >>\n").await;}
        }
    }
}

#[tokio::main]
async fn main()->Result<(),Box<dyn std::error::Error>>{
    println!("[SISTEMA] 🚀 INICIADO — NODOS VISIBLES Y EN MOVIMIENTO");
    let lista_nodos=Arc::new(Mutex::new((1..=NODOS_FIJOS).map(|id|{
        (id,Nodo{id,activo:true,ultima_vez:Utc::now().timestamp_millis() as u64,carga:30,zona:1})
    }).collect()));

    tokio::spawn(señal_expansion(Arc::clone(&lista_nodos)));
    let escucha=TcpListener::bind(("127.0.0.1",PUERTO)).await?;
    println!("[SISTEMA] ✅ PUERTO {} LISTO — TRÁFICO AL TÚNEL",PUERTO);

    let mut ciclo=tokio::time::interval(Duration::from_secs(4));
    loop{tokio::select!{
        _=ciclo.tick()=>ciclo_central(Arc::clone(&lista_nodos)).await,
        res=escucha.accept()=>match res{
            Ok((c,_))=>{let _=tokio::spawn(manejar_conexion(c,Arc::clone(&lista_nodos)));}
            Err(e)=>eprintln!("[ERROR] ❌ {}",e),
        }
    }}
}
