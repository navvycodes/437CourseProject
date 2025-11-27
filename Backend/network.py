import speedtest

def get_network_speed():
    st = speedtest.Speedtest()
    download = st.download() / 1_000_000 
    upload = st.upload() / 1_000_000     
    return {
        "download_mbps": round(download, 2),
        "upload_mbps": round(upload, 2)
    }