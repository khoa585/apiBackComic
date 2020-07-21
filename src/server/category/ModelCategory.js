import * as category from './../../model/category';
export const createCategory = async (data)=>{
    return category.create({...data});
}