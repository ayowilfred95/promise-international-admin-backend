const paymentLIst = (req,res) => {
    const classObj = {
        jss1: "17800",
        jss2: "17800",
        jss3: "17800",
        ss3: "21800",
        primary1: "21000",
        primary2: "21000",
        primary3: "21000",
        primary4: "21000",
        primary5: "21000",
        primary6: "21000",
    } 

    if(classObj[req.body.className] == undefined ) {
        res.status(400).json({
            status: "failed",
            message: `no class found with the name of ${classObj[req.body.className]}`
        })
    }else {
        res.status(200).json({
            status: "success",
            message: classObj[req.body.className]
        })
    }
}

module.exports = {paymentLIst}