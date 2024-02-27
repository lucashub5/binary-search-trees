import { Tree } from './bst';

const insertInput = document.getElementById('insertInput');
const btnInsert = document.getElementById('insertNumber');
const btnDelete = document.getElementById('deleteNumber');
const btnFind = document.getElementById('findNumber');
const infoText = document.getElementById('info');
const btnRebalance = document.getElementById('rebalance');
const infoContainer = document.querySelector('.information');
insertInput.value = '0 1 2 3 4 5';
let tree = new Tree();
treeUpdate();
insertInput.addEventListener('input', treeUpdate);
btnInsert.addEventListener('click', insertNumber);
btnDelete.addEventListener('click', deleteNumber);
btnFind.addEventListener('click', findNumber);
btnRebalance.addEventListener('click', rebalanceTree);

function treeUpdate() {
    tree = new Tree();
    const inputValue = insertInput.value;
    const arr = inputValue.split(' ').map(numero => parseInt(numero, 10)).filter(numero => !isNaN(numero));
    arr.forEach(element => {
        tree.insert(element);
    });
    tree.rebalance();
    printTree(tree);
}

function printTree(tree) {
    const output = document.getElementById('output-div');
    output.innerHTML = tree.prettyPrint(tree.root);
    updateInfo();
}

function insertNumber() {
    const inputValue = parseInt(document.getElementById('inputText').value, 10);
    if (tree.find(inputValue) === null) {
        infoText.textContent = `inserted element: ${inputValue}`;
    } else {
        infoText.textContent = `it already exists`;
    }
    tree.insert(inputValue);
    document.getElementById('inputText').value = '';
    printTree(tree);
}

function deleteNumber() {
    const inputValue = parseInt(document.getElementById('inputText').value, 10);
    if (tree.find(inputValue) != null) {
        infoText.textContent = `removed element: ${inputValue}`;
    } else {
        infoText.textContent = `does not exist`;
    }
    tree.delete(inputValue);
    document.getElementById('inputText').value = '';
    printTree(tree);
}

function findNumber() {
    const inputValue = parseInt(document.getElementById('inputText').value, 10);
    if (tree.find(inputValue) === null) {
        infoText.textContent = `does not exist`;
    } else {
        infoText.textContent = `height: ${tree.height(inputValue)}
        depth: ${tree.depth(inputValue)}`;
    }
    document.getElementById('inputText').value = '';
    printTree(tree);
}

function rebalanceTree() {
    tree.rebalance();
    printTree(tree);
}

function updateInfo() {
    infoContainer.innerHTML = `<h2>Information</h2>
    <a>Balanced: ${tree.isBalanced()}</a>
    <a>Pre Order: ${tree.preOrder()}</a>
    <a>In Order: ${tree.inOrder()}</a>
    <a>Post Order: ${tree.postOrder()}</a>`;
}
