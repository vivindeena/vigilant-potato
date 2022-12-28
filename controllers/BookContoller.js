const Book = require('../models/Book')


const addBook =  (req,res) => {
	if(
		!req.body.id||
		!req.body.name||
		!req.body.author||
		!req.body.genre||
		!req.body.description
		){
			res.status(400).json({
				errorMessage: "Missing Params"
			})
		}
	else{
		Book.findOne({isbn:req.body.id})
		.then((result)=>{
			if(result){
				res.status(400).json({
					errorMessage: "Book with Same ISBN Number exists"
				})
			}
			else{
				const isbn = req.body.id
				const name = req.body.name
				const author = req.body.author
				const genre = req.body.genre
				const description = req.body.description
				const newBook = new Book({
					isbn,
					name,
					author,
					genre,
					description
				})
				newBook
					.save()
					.then(()=>(
						res.status(200).json({
							message: 'success'
						})
					))
					.catch((err)=>{
						res.status(400).json({
							errorMessage: err
						})
					})
			}
		})
	}
}

const getBook = (req,res) => {
	if(!req.params.id){
		res.status(400).json({
      		errorMessage: "Missing parameters",
    	});
	}
    Book.findOne({isbn: req.params.id})
        .then((book) =>{
            if(!book){
				res.status(400).json({
					errorMessage: "Book not found"
				})
			}else{
				res.status(200).json(book)
				console.log(book.hits);
				Book.updateOne({isbn: req.params.id},{hits: book.hits+1})
					.catch((err)=>{
						console.log(err);
					}) 
			}
        })
}

const getBookList = (req, res) => {
  Book.find()
    .then((result) => {
      if(!result.length){
        res.status(400).json({
          Message: "No Books found",
        });
      }else{
        res.status(200).json(result)
      }
    })
    .catch((err) => {
      console.log("Err: " + err);
    });
};

const updateBook = (req, res) =>{
	if (
    !req.body.id ||
    !req.body.name ||
    !req.body.author ||
    !req.body.genre ||
    !req.body.description
  	) {
		res.status(400).json({
			errorMessage: "missing params",
		});
  	}
	else{
		Book.updateOne(
			{isbn: req.body.id},
			{
				name: req.body.name,
				author: req.body.author,
				genre: req.body.genre,
				description: req.body.description
			})
			.then((err,obj)=>{
				res.status(200).json({
					Message: "Updated successfully"
				})
			})
			.catch((err) => {
				res.status(400).json({
					errorMessage: err
				})
			})
	}
}

const removeBook = (req, res) =>{
	console.log(req.body);
	if(!req.body.id){
		res.status(400).json({
      		errorMessage: "Missing Params",
    	});
	}else{
		Book.deleteOne({isbn: req.body.id})
			.then(() => {
				res.status(200).json({
					message: "Book Deleted"
				})
			})
			.catch((err) => {
				res.status(400).json({
					errorMessage: err
				})
			})
	}
}

module.exports = {
    addBook,
    getBookList,
    getBook,
    updateBook,
    removeBook
}
