import pandas as pd
import argparse

def fetch_data(input_path, output_path):
    df = pd.read_csv(input_path)
    # (Optional) Add data preprocessing steps here.
    df.to_csv(output_path, index=False)
    print("Processed data saved to {}".format(output_path))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', default='../data/dataset.csv', help='Path to input CSV')
    parser.add_argument('--output', default='../data/processed_data.csv', help='Path to output processed CSV')
    args = parser.parse_args()
    fetch_data(args.input, args.output)
