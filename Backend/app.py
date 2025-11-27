from flask import Flask, jsonify
import github
app = Flask(__name__)


@app.route('/git-my-open-prs')
def git_my_open_prs():
    prs = github.get_my_open_prs()
    return jsonify(prs)


@app.route('/git-my-requested-prs')
def git_my_requested_prs():
    prs = github.get_my_requested_prs()
    return jsonify(prs)

if __name__ == '__main__':
    app.run(debug=True)
