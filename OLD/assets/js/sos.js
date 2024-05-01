function triggerSOS(){
          if("vibrate" in navigator){
            navigator.vibrate([300, 300, 300, 1000, 1000, 1000, 1000, 300, 300, 300]);
          }
          else{
            alert("Twoje urządzenie nie obsługuje wibracji");
          }
        }