@extends('layouts.app')

@section('title', 'Inmodata')

@section('content')
    <div id="authentication"></div>
@endsection

@push('scripts')
    <script src="{{ mix('js/login.js') }}"></script>
@endpush