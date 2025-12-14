import product from './../models/product';


export const getProducts=async(req,res)=>{
    try{
        const page=parseInt(req.query.page) ||1;
        const limit=parseInt(req.query.limit) ||12;
        const skip=(page-1)*limit;

        // Build query
        let query = { isActive: true };

        // Filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Filter by subCategory
        if (req.query.subCategory) {
            query.subCategory = req.query.subCategory;
        }
    
        // Search by keyword
        if(req.query.keyword) {
            query.$text={ $search : req.query.keyword };
        }


        // priced range filter
        if(req.query.minPrice || req.query.maxPrice){
            query.price={};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        // Featured products
        if (req.query.featured === 'true') {
            query.isFeatured = true;
        }
        // Sort
        let sort = {};
        if (req.query.sort) {
        switch (req.query.sort) {
            case 'price-asc':
            sort.price = 1;
            break;
            case 'price-desc':
            sort.price = -1;
            break;
            case 'rating':
            sort.rating = -1;
            break;
            case 'newest':
            sort.createdAt = -1;
            break;
            default:
            sort.createdAt = -1;
        }
        } else {
        sort.createdAt = -1;
        }
        const products = await Product.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      products
    });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
          });
    }

};


export const getProduct =async(req,res)=>{
    try{
        const product=await product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not found"
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    }catch(error){
        res.status(500).json({
            success: false,
            error:error.message
        });
    }
};


// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin


export const createProduct =async(req,res)=>{
    try{
        const product=await product.create(req.body);
        res.status(201).json({
            success:true,
            message:"Product Created Successfully",
            product
        });
    }catch(error)
    {
         res.status(500).json({
            success:false,
            error:error.message
        })
    }
}


// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin

export const updateProduct =async(req,res)=>{
    try{
        let product=await product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product Not found'
            });
        }

        product=await product.findByIdAndUpdate(req.body,req.params,{
            new : true,
            runValidators:true
        });

        res.status(200).json({
            success:true,
            message:"Product update Successfully",
            product
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message :error.message
        });
    }
};

