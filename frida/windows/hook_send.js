

var addr_send = Module.findExportByName('Ws2_32.DLL', 'send');
send('start script');

var p_send = new NativeFunction(addr_send, 'int', ['int', 'pointer', 'int', 'int']);

Interceptor.replace(addr_send, new NativeCallback(function(p, p2, p3, p4){
      send('call hooked send');
      
      var p_buf = new NativePointer(Number(p2));
      var size = Number(p3);
      var act = p_buf.readU8(); //type is Number
      var ret = -1;
      
      send('==========================================');
      send('p_buf');
      send('==========================================');
      send(hexdump(p_buf,
      {
        offset: 0,
        length: size
      }));
      /*
      if(act == 0x3633){
        
        var size_reply = 1
        for(var i = 0; i< size_reply; i++){
          send('call send in hooked function');
          
          //write count of current act with max 0xff
          var p_dup = Memory.dup(p_buf, size);
          
          p_buf.add(6).writeU8((p_buf.add(6).readU8()+i+1)%0x100);
          
          //var start = new Date().getSeconds();
          //while((new Date().getSeconds() - start) < 1);
  
  
          if(size > 0)
            send('size: ' + size);
          send('==========================================');
          send('p_dup');
          send('==========================================');
          send(hexdump(p_dup,
          {
            offset: 0,
            length: size
          }));   
       
         ret = p_send(p, p_dup, p3, p4);  
        }
        
      }
      */
      ret = p_send(p, p2, p3, p4); 
      send('ret: ' + ret);  
      
  }, 'int', ['int', 'pointer', 'int', 'int']));
  
  