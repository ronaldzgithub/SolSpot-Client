const formatAddress = (address) => {
   let str = address.slice(0, 4) + "...." + address.slice(-4)
   return str;
}


export { formatAddress }



// helper functions