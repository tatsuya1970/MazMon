import boto3
import os
from io import StringIO

def lambda_handler(event, context):
    # S3バケット名を指定
    bucket_name = 'mazmon'

    # S3クライアントを作成
    s3 = boto3.client('s3')

    # 緯度経度のデータ（イベントから取得または固定値で設定）
    car_id = event.get('car_id', '0')
    start_date = event.get('start_date', 'YYYY-MM-DD hh:mm:ss')
    send_date = event.get('send_date', 'YYYY-MM-DD hh:mm:ss')
    latitude = event.get('lat', 35.6895)  # 例: 東京の緯度
    longitude = event.get('lon', 139.6917)  # 例: 東京の経度
    
    # ファイル名を指定
    start_date = start_date.replace('-', '')
    start_date = start_date.replace(' ', '')
    start_date = start_date.replace(':', '')
    file_name = car_id + '_' + start_date + '.csv'

    # CSV形式の文字列を作成
    new_data = f"{latitude},{longitude}\n"
    new_data = send_date + ',' + new_data

    # 既存のファイルをS3からダウンロード
    try:
        response = s3.get_object(Bucket=bucket_name, Key=file_name)
        current_data = response['Body'].read().decode('utf-8')
    except s3.exceptions.NoSuchKey:
        # ファイルが存在しない場合は空の文字列をセット
        current_data = ""

    # 新しいデータを追加
    updated_data = current_data + new_data

    # 更新されたデータをS3にアップロード
    s3.put_object(Body=updated_data, Bucket=bucket_name, Key=file_name)

    return {
        'statusCode': 200,
        'body': 'Data added successfully!'
    }
