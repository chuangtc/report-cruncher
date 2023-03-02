from utils import *
import json

# !pip install sentence-transformers
from sentence_transformers import SentenceTransformer
sbert_model = SentenceTransformer('bert-base-nli-mean-tokens')

import numpy as np
def cosine(u, v):
	return np.dot(u, v) / (np.linalg.norm(u) * np.linalg.norm(v))


def getNearestMatch(s_line, doc_lines, doc_line_ids, topk):
	idx_score = {}
	# doc_s = nlp(s_line)
	doc_s = sbert_model.encode([s_line])[0]
	for idx in doc_line_ids:
		# doc_d = nlp(doc_lines[idx])
		doc_d = sbert_model.encode([doc_lines[idx]])[0]
		# idx_score[idx] = doc_s.similarity(doc_d)
		idx_score[idx] = cosine(doc_s, doc_d)
	sorted_dict = dict(sorted(idx_score.items(), key=lambda kv: kv[1], reverse=True))
	if len(doc_line_ids) > topk:
		topk_idxs = list(sorted_dict.keys())[:topk]
	else:
		topk_idxs = list(sorted_dict.keys())
	return topk_idxs


def prepare_data(in_dataPath, out_path, split):
	ect_path = f'{in_dataPath}/'
	topk = 1
	file_names = []
	entries = []
	for file in os.listdir(ect_path):
		if file.endswith('.txt'):
			f_ect_in = open(f'{ect_path}{file}', 'r')
			doc_lines = [line.strip() for line in f_ect_in.readlines()]
			# if len(doc_lines) > 300:
			# 	continue
			doc_lines_pp = [getPartiallyProcessedText(line) for line in doc_lines]
			assert len(doc_lines) == len(doc_lines_pp)
			
			
			doc_lines_new = doc_lines_pp
			
			entry = {}
			# entry['doc'] = '\n'.join(doc_lines)
			entry['doc'] = '\n'.join(doc_lines_new)
			entries.append(entry)
			file_names.append(file)
			print(f'{file} - Original Lines: {len(doc_lines)} \t Total Lines: {len(doc_lines_new)} ')

	with open(f'{out_path}/{split}.json', 'w') as f_out:
		for entry in entries:
			json.dump(entry, f_out)
			f_out.write("\n")
	with open(f'{out_path}/{split}_files.txt', 'w') as f_out:
		for file in file_names:
			f_out.write(file + "\n")


in_datapath='data-exp'
int_temp_datapath='data-exp/temp'
print(f'\n\n Preparing {in_datapath} data..\n')
y = prepare_data(f'{in_datapath}', f'{int_temp_datapath}','exp')
