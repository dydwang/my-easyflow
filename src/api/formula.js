import http from '@/axios/http';

// 获取配方
export function getFormulaAPI(formula_id){
    return http.get(`/api/uploads/result.json`);
}

// 获取配方结果
export function getFormulaResultAPI(url_req, formula_id){
    return http.get(`/api/result/lookResult`, {
        url_req,
        formula_id
    });
}

// 上传配方集合
export function uploadFormulaAPI(data){
    return http.upload(`/api/result/uploadFormula?fileType=formula&uuid=formula`, data);
}
