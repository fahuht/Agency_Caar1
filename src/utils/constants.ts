import { Car } from "@/app/(main)/(products)/mua-ban-oto/type";

export const regexType = {
  // regex tên tài khoản
  nameUser: /^[a-z0-9]+$/, // minh123

  // regex mật khẩu
  passwordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?!.*\s).{8,}$/,

  // tên tiếng việt không số và có kí hiệu (.,-&+) không nhận toàn khoảng trắng
  fullName:
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ.,&+-]+( [a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ.,&+-]+)*$/,

  // regex sdt ở việt nam
  numberPhone1: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,

  //regex email
  email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
};
export const baseApi = process.env.NEXT_PUBLIC_BASE_API_URL;
export const baseApiFe = process.env.NEXT_PUBLIC_BASE_API_FE_URL;
// export const baseApi = `https://demoapi.caar.vn`;
// export const baseApi = `https://api.caar.vn`;
// export const baseApi = `http://10.100.30.35:9075`;
export const FACEBOOK_ID = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '';
export const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
export const FacebookSDK = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0&appId=${FACEBOOK_ID}&autoLogAppEvents=1`;
export const ZaloShareSDK = `https://sp.zalo.me/plugins/sdk.js`;
export const authorizationHeader = "Basic d2ViYXBwOmVuYW9AMTIz";
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const operatingRegulations = "EE10BA3E-58A4-4052-BB69-44ABFA63D914";
export const termsOfAgreement = "F0E20A43-03D0-41AC-AEA8-A8703D19763D";
export const privacyPolicy = "24001944-0C25-4439-B3E8-E597E5A6A87F";
export const resolveComplaints = "49C658FD-EA3C-4531-8419-77D1A1424B89";

export const defaultImages = "data:image/png;base64,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";

export const linkViewDocuments = `https://view.officeapps.live.com/op/embed.aspx?src=https://api.laand.vn/file-service/api/v1/documents/file/download?fileId`;

export const appMoblieIos = "https://apps.apple.com/vn/app/laand/id6448577507?l=vi";
export const appMoblieAndroid = "https://play.google.com/store/apps/details?id=vn.caar";
export const PageFacebook = "https://play.google.com/store/apps/details?id=vn.caar";

// các trường cần lấy theo dạng grid
export const FieldCarGrid: (keyof Car)[] = ['id', 'slug', 'createdDate', 'imageUrl', 'title', 'location', 'price', 'mileage', 'buildDate', 'transmission', 'isLove', 'productId']

// các trường cần lấy theo dạng column
export const FieldCarColumn: (keyof Car)[] = ['id', 'slug', 'createdDate', 'imageUrl', 'title', 'location', 'price', 'mileage', 'buildDate', 'transmission', 'isLove', 'productId']

// các trường cần lấy theo dạng table
export const FieldCarTable: (keyof Car)[] = ['id', 'slug', 'createdDate','urlImages', 'imageUrl', 'title', 'location', 'price', 'mileage', 'buildDate', 'transmission', 'make', 'model', 'bodyStyle', 'isLove', 'productId']