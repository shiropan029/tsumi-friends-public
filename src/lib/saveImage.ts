import { supabase } from "@/lib/supabase";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// 環境変数でSupabase Storageとローカル保存を切り替える
const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === "true";

const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET!;
const LOCAL_UPLOAD_DIR = "uploads/profile-images";

/**
 * 画像ファイルを保存してURLを返す
 * @param file
 * @param fileName
 * @returns
 */
export async function saveImage(
  file: File,
  fileName: string,
): Promise<string | null> {
  if (USE_SUPABASE) {
    return saveImageToSupabase(file, fileName);
  } else {
    return saveImageToLocal(file, fileName);
  }
}

/**
 * Supabase Storageに画像を保存してURLを返す
 * @param file
 * @param fileName
 * @returns
 */
async function saveImageToSupabase(
  file: File,
  fileName: string,
): Promise<string | null> {
  // アップロード
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, {
      upsert: true,
    });

  if (error != null) {
    console.error("Supabase Storage アップロードエラー:", error);
    return null;
  }

  // 公開urlを取得
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);

  return data.publicUrl;
}

/**
 * ローカルファイルシステムに画像を保存してURLを返す
 * @param file
 * @param fileName
 * @returns
 */
async function saveImageToLocal(
  file: File,
  fileName: string,
): Promise<string | null> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    // public配下に保存することでNext.jsの静的ファイルになり、urlで取得できる
    const dirPath = path.join(process.cwd(), "public", LOCAL_UPLOAD_DIR);

    await mkdir(dirPath, { recursive: true });

    const filePath = path.join(dirPath, fileName);
    await writeFile(filePath, buffer);

    return `/${LOCAL_UPLOAD_DIR}/${fileName}`;
  } catch (error) {
    console.error("ローカル保存エラー:", error);
    return null;
  }
}
