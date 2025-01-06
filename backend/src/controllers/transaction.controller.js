

export const borrowBook=async(req,res)=>{
    res.send("/borrow");
}

export const returnBook=async(req,res)=>{
    res.send("/return");
}


export const getAllTransactions=async(req,res)=>{
    res.send("/allTransaction");
}