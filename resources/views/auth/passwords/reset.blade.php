@extends('layouts.app')

@section('title', 'Inmodata')

@section('content')
    <div id="reset-password"></div>
@endsection

@push('scripts')
    <script src="{{ mix('js/resetPassword.js') }}"></script>
@endpush