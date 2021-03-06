// Find the module for the program itself, always at index 0:
send('test');
var m = Process.enumerateModules()[0];

// Or load a module by name:
//var m = Module.load('win32u.dll');

// Print its properties:
console.log(JSON.stringify(m));

// Dump it from its base address:
console.log(hexdump(m.base));

// The pattern that you are interested in:
function hookByPattern(pattern){
  Memory.scan(m.base, m.size, pattern, {
    onMatch: function (address, size) {
      send('Memory.scan() found match at', address,
          'with size', size);
      
      /*
      send(hexdump(address.sub(0x10),
      {
          offset:0,
          length:0x30
      }));
      */
      Interceptor.replace(address, new NativeCallback(function(){
        send("Replaced callback called");
        var ret = ptr(0);
        return ret;
      }, "char", []));
      
      // Optionally stop scanning early:
      return 'stop';
    },
    onComplete: function () {
      send('Memory.scan() complete');
    }
  });
}

/*
var pt_threadFunc = '55 8B EC ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? BD ?? FF';

hook(pt_threadFunc);
*/

//var pt_victim= '6A FF 68 9C 53 91 00 64 A1 00 00 00 00 50 64 89'; 
function findBaseMods(name){
  var list_mods = Process.enumerateModules();

  for(var i = 0; i<list_mods.length; i++){
    if(list_mods[i].name != name)
      continue
    for(var key in list_mods[i]){
      if(key != 'type')
        send(key + ' : ' + list_mods[i][key]);
    }
    return list_mods[i].base;
  }
}


function hookByName(dllName, funcName, ctRet){
  Interceptor.attach(Module.findExportByName(dllName, funcName), {
    onEnter: function(args){
    },
    onLeave: function(retval){
      //send('ret: ' + retval);
      retval.replace(ctRet);
      return retval;
    }
  });
}




//hookByName('User32.DLL', 'GetWindowTextA', 0);
hookByName('User32.DLL', 'GetWindow', 0);

Interceptor.replace(ptr(0x4F2480), new NativeCallback(function (v0){
  //send("replace function is called");
  var ret = ptr(-1);
  return ret;
}, 'int', ['int']));


/*
//hook check function
Interceptor.attach(ptr(0x404836), {
  onEnter: function(args){
    send('Hook function called []');
  },
  onLeave: function(retval){
    send('ret: ' + retval);
    retval.replace(-1);
    return retval;
  }
});
*/
//hookByPattern('81 EC A4 02 00 00 85 C0 53 55 56 57 0F 84 EF 0A');